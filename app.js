/// <reference path="angular-1.4.d.ts" />
var Directives;
(function (Directives) {
    var User = (function () {
        function User(n, gid, url) {
            this.name = n;
            this.gravatar_id = gid;
            this.repos_url = url;
        }
        return User;
    }());
    Directives.User = User;
    var Repo = (function () {
        function Repo() {
        }
        return Repo;
    }());
    Directives.Repo = Repo;
})(Directives || (Directives = {}));
var githubViewer;
(function (githubViewer) {
    var MainController = (function () {
        function MainController($scope, $http) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            $scope.username = "angular";
            $scope.message = "GitHub Viewer";
            $scope.repoSortOrder = "-stargazers_count";
            $scope.search = function (username) { return _this.search(username, _this); };
        }
        MainController.prototype.onError = function (self, reason) {
            this.$scope.error = "Could not fetch the user.";
            return reason.data;
        };
        MainController.prototype.onRepos = function (self, response) {
            self.$scope.repos = response.data;
            return response.data;
        };
        MainController.prototype.onUserComplete = function (self, response) {
            // console.log("Inside onUserComplete");
            self.$scope.user = response.data;
            self.$http.get(self.$scope.user.repos_url)
                .then(function (response) { return self.onRepos(self, response); });
            return response.data;
        };
        MainController.prototype.search = function (username, self) {
            self.$http.get(MainController.gitHubUrl + self.$scope.username)
                .then(function (response) { return self.onUserComplete(self, response); }, function (response) { return self.onError(self, response); });
        };
        MainController.gitHubUrl = "https://api.github.com/users/";
        MainController.$inject = [
            "$scope",
            "$http"
        ];
        return MainController;
    }());
    githubViewer.MainController = MainController;
    angular.module("githubViewer", []).controller("MainController", MainController);
})(githubViewer || (githubViewer = {}));
//# sourceMappingURL=app.js.map