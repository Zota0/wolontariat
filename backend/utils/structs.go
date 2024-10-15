package structs

import (
	"time"
)

type Users struct {
	Id         int    `json:"ID"`
	First_name string `json:"FIRST_NAME"`
	Last_name  string `json:"LAST_NAME"`
	Email      string `json:"EMAIL"`
	Phone      string `json:"PHONE"`
}

type Messages struct {
	Id       int       `json:"ID"`
	Content  string    `json:"CONTENT"`
	Group_id int       `json:"GROUP_ID"`
	User_id  int       `json:"USER_ID"`
	Uploaded time.Time `json:"UPLOADED"`
}

type Access struct {
	User_id int    `json:"USER_ID"`
	Type    string `json:"TYPE"`
	Groups  []int8 `json:"GROUPS"`
}

type Groups struct {
	Id          int    `json:"ID"`
	Group_name  string `json:"GROUP_NAME"`
	Description string `json:"DESCRIPTION"`
	Img         string `json:"IMG"`
}
