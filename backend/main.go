package main

import (
	structs "backend/utils" // Replace with your actual path
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

// connectDB establishes a database connection.  It returns an error if the connection fails.
func connectDB(dsn string) (*sql.DB, error) {
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	// Test the connection
	err = db.Ping()
	if err != nil {
		return nil, fmt.Errorf("database ping failed: %w", err)

	}
	return db, nil
}

// getUsers retrieves users from the database.  It returns a slice of Users and an error if something goes wrong.
func getUsers(db *sql.DB) ([]structs.Users, error) {
	rows, err := db.Query("SELECT id, first_name, last_name, email, phone FROM users")
	if err != nil {
		return nil, fmt.Errorf("failed to query users: %w", err)
	}
	defer rows.Close()

	var users []structs.Users
	for rows.Next() {
		var user structs.Users
		err := rows.Scan(&user.Id, &user.First_name, &user.Last_name, &user.Email, &user.Phone)
		if err != nil {
			return nil, fmt.Errorf("failed to scan user row: %w", err)
		}
		users = append(users, user)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating rows: %w", err)
	}

	return users, nil
}

func getUser(db *sql.DB, id uint64) (*structs.Users, error) {
	var user structs.Users
	err := db.QueryRow("SELECT * FROM users WHERE id = ?", id).Scan(&user.Id, &user.First_name, &user.Last_name, &user.Email, &user.Phone)
	if err != nil {
		return nil, fmt.Errorf("failed to query user: %w", err)
	}
	return &user, nil
}

func Out(w http.ResponseWriter, msg string, data any, status uint8) error {
	w.Header().Set("Content-Type", "application/json")
	return json.NewEncoder(w).Encode(map[string]interface{}{
		"msg":    msg,
		"data":   data,
		"status": status,
	})
}

func httpErrorJSON(w http.ResponseWriter, msg string, status int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	err := json.NewEncoder(w).Encode(map[string]interface{}{
		"msg":    msg,
		"data":   nil,
		"status": status,
	})
	if err != nil {
		log.Printf("Error encoding JSON response: %v", err)
	}
}

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dsn := os.Getenv("DSN")
	if dsn == "" {
		log.Fatal("DSN environment variable is not set")
	}

	db, err := connectDB(dsn)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	users, err := getUsers(db)
	if err != nil {
		log.Fatal(err)
	}

	http.HandleFunc("/get-users", func(w http.ResponseWriter, r *http.Request) {
		if err := Out(w, "", users, 200); err != nil {
			httpErrorJSON(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}
		log.Printf("GET /get-users request received")
	})

	http.HandleFunc("/get-user", func(w http.ResponseWriter, r *http.Request) {
		id, err := strconv.ParseUint(r.URL.Query().Get("id"), 10, 64)

		if err != nil {
			httpErrorJSON(w, "Invalid id parameter", http.StatusBadRequest)
			return
		}
		user, err := getUser(db, id)
		if err != nil {
			httpErrorJSON(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		if err := Out(w, "", user, 200); err != nil {
			httpErrorJSON(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}
	})

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.Redirect(w, r, "/404", http.StatusFound)
		}
		if err := Out(w, "Working!", "", 200); err != nil {
			httpErrorJSON(w, "Internal Server Error", http.StatusInternalServerError)
		}
	})

	http.HandleFunc("/404", func(w http.ResponseWriter, r *http.Request) {
		httpErrorJSON(w, "Not Found", http.StatusNotFound)
	})

	fmt.Println("Server listening on :6866")
	log.Fatal(http.ListenAndServe(":6866", nil))
}
