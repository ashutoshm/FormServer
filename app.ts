/// <reference path="angular-1.4.d.ts" />

module Directives {
    export class User {
        name: string;
        gravatar_id: string;
        repos_url: string;
        
        constructor(n: string, gid: string, url: string) {
            this.name = n;
            this.gravatar_id = gid;
            this.repos_url = url;
        }
    }
    
    export class Repo {
        name: string;
        stargazers_count: number;
        language: string;
    }
           
    export interface IGHViewerScope extends angular.IScope
    {
        message: string;
        error: string;
        username: string;
        user: User;
        search: (username: string) => void;
        repoSortOrder: string;
        repos: Repo[];
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
        
        constructor(protected $scope: Directives.IGHViewerScope, $http: angular.IHttpService) {
            this.$http = $http;
            $scope.username = "angular";
            $scope.message = "GitHub Viewer";
            $scope.repoSortOrder = "-stargazers_count";
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
            // console.log("Inside onUserComplete");
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
     
    angular.module("githubViewer", []).controller("MainController", MainController);
}
