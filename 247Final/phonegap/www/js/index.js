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

var startConversation = ['Hari: <span id="hariColor">Hi! My name is Hari!</span>'];
var hariOutput = "";

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
        // hariOutput = document.getElementById("hariOutput").innerHTML;
        var conversation = JSON.parse(localStorage.getItem("conversation"));
        conversation.push("Hari: " + hariOutput);
        localStorage.setItem("conversation", JSON.stringify(conversation));
    },
    initHariOutput: function() {
        uname = localStorage.getItem("username");
        document.getElementById("hariOutput").innerHTML = "Hi " + uname + "! My name is Hari!";
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        // console.log('Received Event: ' + id);
    },
    //
    chatSubmit: function(element) {
        var conversation = JSON.parse(localStorage.getItem("conversation"));
        uname = localStorage.getItem("username");
        conversation.push(uname + ": " + element.innerHTML);
        console.log("------------");
        console.log("");
        console.log("");
        console.log(conversation[conversation.length - 1]);
        console.log("");
        console.log("");
        console.log("------------");
        localStorage.setItem("conversation", JSON.stringify(conversation));

        // Clear Hari output after updating conversation with user input.
        hariOutput = "";
        this.updateConversation();
    },
    updateConversation: function() {
        var conversation = JSON.parse(localStorage.getItem("conversation"));
        // if (localStorage["conversation"]) {
        // conversation = JSON.parse(localStorage.getItem("conversation"));
        // }
        // if (hariOutput != "") {
        //     conversation.push("Hari: " + hariOutput);
        // }
        // document.getElementById("conversation").innerHTML = conversation.join('<br>');
        // document.getElementById("userInput").innerHTML = "";
        // document.getElementById("hariOutput").innerHTML = hariOutput;
        // convoBox = document.getElementById("conversation");
        // convoBox.scrollTop = convoBox.scrollHeight;
    },
    checkLogin: function() {
        if (localStorage.getItem("loggedIn") === null) {
            // First time login.
            console.log("First time login. Showing login screen.");
            document.getElementById("loginScreen").style.display = "inherit";
            document.getElementById("mainScreen").style.display = "none";
            localStorage.setItem("conversation", JSON.stringify(startConversation));
            return false;
        } else {
            console.log("Showing chat screen.");
            document.getElementById("loginScreen").style.display = "none";
            document.getElementById("mainScreen").style.display = "inherit";
            return true;
        }
    },
    switchLogged: function() {
        if (localStorage.getItem("loggedIn") === null) {
            // First time pressing the login button.
            console.log("First time pressing login button.");
            localStorage.setItem("loggedIn", 'true');
            username = document.getElementById("input-name").value;
            username = $.trim(username);
            localStorage.setItem("username", username);
            this.initHariOutput();
            this.checkLogin();
        } else {
            console.log("Changing loggedIn to false.");
            localStorage.clear(); // This is working
            location.reload();
        }
    },
    showTextArea: function() {
        document.getElementById("userInput").innerHTML = "";
        document.getElementById("speakButton").style.display = "none";
        document.getElementById("userInput").style.display = "inherit";
        document.getElementById("userInput").setAttribute("contenteditable", "true");
        document.getElementById("userInput").focus();
        // Uncomment to make heart disappear
        // document.getElementById("talkToMe").style.display = "none";
    },
    hideTextArea: function() {
        document.getElementById("speakButton").style.display = "inherit";
        myHTML = document.getElementById("userInput").innerHTML;
        uname = localStorage.getItem("username");
        document.getElementById("userInput").innerHTML = uname + ": " + myHTML;
        document.getElementById("userInput").blur();
        document.getElementById("userInput").setAttribute("contenteditable", "false");
        document.getElementById("hariOutput").style.display = "none";
        document.getElementById("thoughtBubble").style.display = "inherit";

    }
};

$("#userInput").on('keydown', function(e) {
    if(e.keyCode == 13)
    {
        e.preventDefault();
        app.chatSubmit(document.getElementById('userInput'));
        app.hideTextArea();
    }
});
