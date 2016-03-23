/// <reference path="angular-1.4.d.ts" />
/// <reference path="models.ts" />
var Directives;
(function (Directives) {
    var RepoDisplay = (function () {
        function RepoDisplay() {
            this.restrict = "E";
            this.templateUrl = "repoDisplay.html";
            this.replace = true;
            this.scope = {
                repos: "=",
                repoSortOrder: "="
            };
        }
        return RepoDisplay;
    }());
    Directives.RepoDisplay = RepoDisplay;
    var UserDetails = (function () {
        function UserDetails() {
            this.restrict = "E";
            this.templateUrl = "userdetails.html";
            this.replace = true;
            this.scope = {
                user: "="
            };
        }
        return UserDetails;
    }());
    Directives.UserDetails = UserDetails;
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
            $scope.user = new Models.User($scope.username, "", "");
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
            //console.log("Inside onUserComplete");
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
    angular.module("githubViewer", [])
        .controller("MainController", MainController)
        .directive("userDetails", function () { return new Directives.UserDetails(); })
        .directive("repoDisplay", function () { return new Directives.RepoDisplay(); });
})(githubViewer || (githubViewer = {}));
//# sourceMappingURL=app.js.map