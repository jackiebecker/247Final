/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var conversation = [];
var loggedIn = false;
var hariOutput;

var app = {

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    saveHariOutput: function() {
        hariOutput = document.getElementById("hariOutput").innerHTML;
    },
    updateConversation: function() {
        if (localStorage["conversation"]) {
            conversation = JSON.parse(localStorage.getItem("conversation"));
        }
        if (hariOutput != "") {
            conversation.push("Hari: " + hariOutput);
        }
        document.getElementById("conversation").innerHTML = conversation.join('<br>');
        document.getElementById("userInput").value = "";
        document.getElementById("hariOutput").innerHTML = hariOutput;
        convoBox = document.getElementById("conversation");
        convoBox.scrollTop = convoBox.scrollHeight;
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    //
    chatSubmit: function(element) {
        conversation.push("You: " + element.value);
        console.log("------------");
        console.log("");
        console.log("");
        console.log(conversation[conversation.length - 1]);
        console.log("");
        console.log("");
        console.log("------------");
        localStorage.setItem("conversation", JSON.stringify(conversation));
        hariOutput = "";
        this.updateConversation();
    }
};

function switchLogged() {
    if (loggedIn) {
        document.getElementById("loginScreen").style.display = "inherit";
        document.getElementById("mainScreen").style.display = "none";
        loggedIn = false;
    } else {
        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("mainScreen").style.display = "inherit";
        loggedIn = true;
    }
}

// function switchLogged() {
//     // The first time the app starts, the localStorage variable loggedIn
//     // does not exist.
//     if (localStorage["loggedIn"] === null) {
//         // First time the Hi! button is hit to enter the app
//         localStorage.setItem("loggedIn", true);
//         console.log("Setting loggedIn to true for the first time.");
//     }
//     // If the localStorage variable loggedIn is true, go back to the Hi! screen
//     if (localStorage.getItem("loggedIn") == true) {
//         localStorage.setItem("loggedIn", false);
//         localStorage.removeItem("conversation");
//         console.log("Setting loggedIn to false.");
//     } else {
//         localStorage.setItem("loggedIn", true);
//         console.log("Setting loggedIn to true.");
//     }
// }
