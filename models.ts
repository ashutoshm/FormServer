/// <reference path="angular-1.4.d.ts" />

module Models {
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
