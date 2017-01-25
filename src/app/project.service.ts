import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Project} from './model/project';
import {CommonRestService} from "./common-rest.service";


@Injectable()
export class ProjectService extends CommonRestService {

  private static PROJECTS_URL = '/api/projects';

  constructor(http: Http) {
    super(http);
  }


  getProjectsByUserId(userId: string, assignedToo: boolean): Promise<Array<Project>> {
    const params = {
      userId: userId,
      assignedToo: assignedToo
    };

    return this
      .post(ProjectService.PROJECTS_URL, params)
      .toPromise()
      .then(response => {
        let projects: Project[] = Project.jsonArrToObjArr(response.json().data);
        return projects;
      })
      .catch(ProjectService.handleError);
  }


  updateProject(project: Project): Promise<Project> {
    const url = `${ProjectService.PROJECTS_URL}/${project.getId()}`;
    return this
      .put(url, project)
      .toPromise()
      .then(response => {
        let project: Project = Project.jsonToObj(response.json());
        return project;
      })
      .catch(ProjectService.handleError);
  }
}
