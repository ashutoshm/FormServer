/// <reference path="angular-1.4.d.ts" />
/// <reference path="models.ts" />

module Directives {
    export class RepoDisplay implements angular.IDirective {
        public restrict: string = "E";
        public templateUrl:  string = "repoDisplay.html"
        public replace: boolean = true;
        public scope = {
            repos: "=",
            repoSortOrder: "="
        }
    }
    
    export class UserDetails implements angular.IDirective {
        public restrict = "E";
        public templateUrl = "userdetails.html";
        public replace = true;
        public scope = {
            user: "="
        }
    }
}

module githubViewer {
           
    export class MainController {
        static gitHubUrl: string = "https://api.github.com/users/";
        
        $http: angular.IHttpService;
               
        public static $inject = [
            "$scope",
            "$http"
        ];
        
        constructor(protected $scope: Models.IGHViewerScope, $http: angular.IHttpService) {
            this.$http = $http;
            $scope.username = "angular";
            $scope.message = "GitHub Viewer";
            $scope.repoSortOrder = "-stargazers_count";
            $scope.user = new Models.User($scope.username, "", "");
             
            $scope.search = (username: string) => this.search(username, this);
        }
        
        onError(self: MainController, reason : any) : angular.IPromise<any> {
            this.$scope.error = "Could not fetch the user."
            return reason.data;
        }
        
        onRepos(self: MainController, response: any) : angular.IPromise<any> {      
            self.$scope.repos = response.data;
            return response.data;
        }
        
        onUserComplete(self: MainController, response: any) : angular.IPromise<any> {
            //console.log("Inside onUserComplete");
            self.$scope.user = response.data;
                             
            self.$http.get(self.$scope.user.repos_url)
                .then((response: any) => self.onRepos(self, response));
            return response.data;
        }
        
        search(username: string, self: MainController) {
            self.$http.get(MainController.gitHubUrl + self.$scope.username)
            .then((response: any) => self.onUserComplete(self, response),
                  (response: any) => self.onError(self, response))            
        }
    }
     
    angular.module("githubViewer", [])
    .controller("MainController", MainController)
    .directive("userDetails", () => new Directives.UserDetails())
    .directive("repoDisplay", () => new Directives.RepoDisplay());
}
