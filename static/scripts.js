// /static/scripts.js
// Helper function to safely log messages
function safeLog(message, data) {
    if (console && console.log) {
        console.log(message, data);
    }
}

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
        error: function(jqXHR, textStatus, errorThrown) {
            safeLog("Error loading users:", textStatus);
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
        error: function(jqXHR, textStatus, errorThrown) {
            safeLog("Error creating user:", textStatus);
            alert("Error creating user");
        }
    });
}

function findUser(email) {
    safeLog("Finding user with email:", email);  // Correct console.log
    $.ajax({
        url: "/users/email/" + encodeURIComponent(email),
        method: "GET",
        success: function(user) {
            safeLog("User found:", user);  // Correct console.log
            $("#updateEmail").val(user.email);
            $("#updateUsername").val(user.username);
            $("#updateFirstName").val(user.first_name);
            $("#updateLastName").val(user.last_name);
            $("#updateGender").val(user.gender);
            $("#updateCountry").val(user.country);
            $("#updateIsActive").prop("checked", user.isActive);
            $("#updateForm").show();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            safeLog("Error finding user:", textStatus);  // Correct console.log
            alert("User not found or an error occurred: " + textStatus);
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
            $("#updateForm").hide();
            loadAllUsers();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            safeLog("Error updating user:", textStatus);
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
        error: function(jqXHR, textStatus, errorThrown) {
            safeLog("Error deleting user:", textStatus);
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

    $("#findUserForm").submit(function(e) {
        e.preventDefault();
        safeLog("Find user form submitted");  // Correct console.log
        var email = $("#findEmail").val();
        findUser(email);
    });

    $("#updateForm").submit(function(e) {
        e.preventDefault();
        safeLog("Update form submitted");  // Correct console.log
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

// Function to check if jQuery is loaded
function checkJQuery() {
    if (typeof jQuery == 'undefined') {
        safeLog("jQuery is not loaded!");
    } else {
        safeLog("jQuery is loaded, version: " + jQuery.fn.jquery);
    }
}

// Call this function when the page loads
$(document).ready(checkJQuery);