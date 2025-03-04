export const adminMenu = [
    { //Manage users
        name: 'menu.admin.user', menus: [
            // {
            //     name: 'menu.admin.manage-user', link: '/system/user-manage',
            //     // subMenus: [
            //     // { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
            //     // { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
            //     // ]
            // },
            {
                name: 'menu.admin.manage-admin', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'

            },
           
        ]
    },
    { //Manage clinic
        name: 'menu.admin.clinic', menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            },
        ]
    },
    { //Manage specialty
        name: 'menu.admin.specialty', menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },
        ]
    },
    // { //Manage blog
    //     name: 'menu.admin.blog', menus: [
    //         {
    //             name: 'menu.admin.manage-blog', link: '/system/manage-blog'
    //         },
    //     ]
    // },

];

export const doctorMenu = [
    { //Manage users
        name: 'menu.admin.user',
        menus: [
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
            {
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'
            },

        ]
    }
];