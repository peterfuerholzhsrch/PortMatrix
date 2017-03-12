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
    return this
      .get(`${ProjectService.PROJECTS_URL}?userId=${userId}&assignedToo=${assignedToo}`)
      .toPromise()
      .then(response => {
        return Project.jsonArrToObjArr(response.json().data);
      })
      .catch(CommonRestService.handleError);
  }


  getProject(projectId: string): Promise<Project> {
    return this
      .get(`${ProjectService.PROJECTS_URL}/${projectId}`)
      .toPromise()
      .then(response => {
        return Project.jsonToObj(response.json());
      })
     .catch(CommonRestService.handleError);
  }

  // currently unused:
  //
  // updateProject(project: Project): Promise<Project> {
  //   const url = `${ProjectService.PROJECTS_URL}/${project.getId()}`;
  //   return this
  //     .put(url, project)
  //     .toPromise()
  //     .then(response => {
  //       return Project.jsonToObj(response.json());
  //     })
  //     .catch(CommonRestService.handleError);
  // }
}
