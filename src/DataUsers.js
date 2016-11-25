export default {
	users: [
		{
			email: 'fred@dad.com',
			clients: [
				{
					id: 1,
					name: 'C1',
					password: 'fredpass',
					projects: [
						{
							id: 1,
							title: 'P1',
							access_any_study: false,
							studies: [
								{ id: 1, title: 'A', roles: [] },
								{ id: 2, title: 'B', roles: [] },
							]
						},
						{
							id: 2,
							title: 'P2',
							studies: [
								{ id: 1, title: 'C', roles: []},
								{ id: 2, title: 'D', roles: []},
							]
						}
					]
				}
			]
		},
		{
			email: "sue@boo.com",
			clients: [{
				id: 1,
				projects: [{
					id: 1,
					studies: [
						{ id: 1, title: 'A', roles: ['admin'] }
					]
				}]
			}]
		},
		{
			email: "lou@noo.com",
			clients: [{
				id: 1,
				projects: [{
					id: 1,
					studies: [
						{ id: 1, title: 'A', roles: ['admin'] }
					]
				}]
			}]
		}
	]
}
