/// <reference path="angular-1.4.d.ts" />
var Models;
(function (Models) {
    var User = (function () {
        function User(n, gid, url) {
            this.name = n;
            this.gravatar_id = gid;
            this.repos_url = url;
        }
        return User;
    }());
    Models.User = User;
    var Repo = (function () {
        function Repo() {
        }
        return Repo;
    }());
    Models.Repo = Repo;
})(Models || (Models = {}));
//# sourceMappingURL=models.js.map