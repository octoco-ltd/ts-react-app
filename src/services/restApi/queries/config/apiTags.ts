export enum Endpoint {
    Crowd = 'Crowd',
    DataScripts = 'DataScripts',
    Export = 'Export',
    FileUpload = 'FileUpload',
    Job = 'Job',
    JobTask = 'JobTask',
    Language = 'Language',
    Roles = 'Roles',
    Skill = 'Skill',
    User = 'User',
    UserJob = 'UserJob',

}

export const TAG_TYPES: readonly string[] = Object.values(Endpoint);

export enum TagId {
    List = 'List',
    Detail = 'Detail',
    Create = 'Create',
    Update = 'Update',
    Delete = 'Delete',
}
    