(function () {
    var chatHub = $.connection.chatHub;
    $.connection.hub.logging = true;
    $.connection.hub.start();

    chatHub.client.newPost = function (post) {
        chatViewModel.addPost(post);
    };

    var ChatViewModel = function () {
        var self = this;
        self.username = "";
        self.post = ko.observable("");
        self.postList = ko.observableArray();
    };

    ChatViewModel.prototype = {
        sendPost: function () {
            var self = this;
            chatHub.server.chat(self.username, self.post());
            self.post("");
        },
        addPost: function (post) {
            var self = this;
            self.postList.push(post);
        }
    }
    var chatViewModel = new ChatViewModel();

    $(function () {
        ko.applyBindings(chatViewModel);
    });
}());