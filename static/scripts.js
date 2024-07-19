// /static/scripts.js

function loadAllUsers() {
    $.ajax({
        url: "/users/",
        method: "GET",
        success: function(res) {
            var userList = $("#allUsers");
            userList.empty();
            res.forEach(function(user) {
                var li = $("<li></li>");
                li.html(
                    "ID: " + user.id + "<br>" +
                    "Email: " + user.email + "<br>" +
                    "Username: " + user.username + "<br>" +
                    "First Name: " + user.first_name + "<br>" +
                    "Last Name: " + user.last_name + "<br>" +
                    "Gender: " + user.gender + "<br>" +
                    "Country: " + user.country + "<br>" +
                    "Is Active: " + user.isActive
                );
                userList.append(li);
            });
        },
        error: function() {
            console.log("Error loading users");
        }
    });
}

function createUser(userData) {
    $.ajax({
        url: "/users/",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(userData),
        success: function(res) {
            alert("User created successfully!");
            $("#userForm")[0].reset();
            loadAllUsers();
        },
        error: function() {
            alert("Error creating user");
        }
    });
}

function updateUser(userData) {
    $.ajax({
        url: "/users/",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(userData),
        success: function(res) {
            alert("User updated successfully!");
            $("#updateForm")[0].reset();
            loadAllUsers();
        },
        error: function() {
            alert("Error updating user");
        }
    });
}

function deleteUser(userId) {
    $.ajax({
        url: "/users/" + userId,
        method: "DELETE",
        success: function(res) {
            alert("User deleted successfully!");
            $("#deleteForm")[0].reset();
            loadAllUsers();
        },
        error: function() {
            alert("Error deleting user");
        }
    });
}

$(document).ready(function() {
    loadAllUsers();

    $("#toggleUsersBtn").click(function() {
        $("#allUsersContainer").toggle();
    });

    $("#userForm").submit(function(e) {
        e.preventDefault();
        var userData = {
            email: $("#email").val(),
            username: $("#username").val(),
            password: $("#password").val(),
            first_name: $("#first_name").val(),
            last_name: $("#last_name").val(),
            gender: $("#gender").val(),
            country: $("#country").val(),
            isActive: $("#isActive").is(":checked")
        };
        createUser(userData);
    });

    $("#updateForm").submit(function(e) {
        e.preventDefault();
        var userData = {
            email: $("#updateEmail").val(),
            username: $("#updateUsername").val(),
            password: $("#updatePassword").val(),
            first_name: $("#updateFirstName").val(),
            last_name: $("#updateLastName").val(),
            gender: $("#updateGender").val(),
            country: $("#updateCountry").val(),
            isActive: $("#updateIsActive").is(":checked")
        };
        updateUser(userData);
    });

    $("#deleteForm").submit(function(e) {
        e.preventDefault();
        var userId = $("#deleteId").val();
        deleteUser(userId);
    });
});