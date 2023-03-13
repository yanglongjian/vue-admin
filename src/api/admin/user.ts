import request from '@/utils/system/request'
/**
 * 用户管理
 */
const module='user'

/**
 * 读取
 * @param data 
 * @returns 
 */
 export function read(data:any) {
    return request.post(`/api/admin/${module}/read?`,data);
  }
  
  /**
   * 新增
   * @param data 
   * @returns 
   */
  export function create(data:any) {
    return request.post(`/api/admin/${module}/create`,data);
  }
  
  
  /**
   * 更新
   * @param data 
   * @returns 
   */
  export function update(data:any) {
    return request.post(`/api/admin/${module}/update`,data);
  }
  
  
  
  /**
   * 删除
   * @param data 
   * @returns 
   */
  export function deleted(data:any) {
    return request.post(`/api/admin/${module}/delete`,data);
  }



  
/**
 * 重置密码
 * @returns 
 */
 export function resetPassword(data:any) {
  return request.post(`/api/admin/${module}/resetPassword`,data);
}


/**
 * 读取用户权限
 * @returns 
 */
 export function readUserModules(userId:Number) {
  return request.get(`/api/admin/${module}/readUserModules?userId=${userId}`);
}

/**
 * 设置用户权限
 * @param data 
 * @returns 
 */
export function setUserModules(data:any) {
  return request.post(`/api/admin/${module}/setUserModules`,data);
}


/**
 * 读取用户角色
 * @returns 
 */
export function readUserRoles(userId:number) {
  return request.get(`/api/admin/${module}/readUserRoles?userId=${userId}`);
}
/**
 * 设置用户角色
 * @returns 
 */
 export function setRoles(data:any) {
  return request.post(`/api/admin/${module}/setRoles`,data);
}

