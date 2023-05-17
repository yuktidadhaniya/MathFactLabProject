/**
 * Authorization Roles
 */
const authRoles = {
  all: ["admin", "teacher", "student"],
  admin: ["admin"],
  teacher: ["teacher"],
  parent: ["parent"],
  student: ["student"],
  staff: ["admin", "staff"],
  user: ["admin", "staff", "user"],
  superAdmin: ["super_admin"],

  onlyGuest: [],
};

export default authRoles;
