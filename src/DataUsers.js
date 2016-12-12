export default [
	{
		email: 'fred@dad.com',
		clients: [
			{
				id: 1,
				name: 'C-A',
				password: 'apass',
				roles: ['admin'],
				projects: [
					{
						id: 1,
						name: 'P-A',
						roles: ['researcher'],
						studies: [
							{ id: 1, name: 'S-A', roles: ['observer'] },
							{ id: 2, name: 'S-B', roles: [] },
						]
					},
					{
						id: 2,
						name: 'P-B',
						roles: [],
						studies: [
							{ id: 1, name: 'S-C', roles: []},
							{ id: 2, name: 'S-D', roles: []},
						]
					}
				]
			},
			{
				id: 2,
				name: 'C-B',
				password: 'bpass',
				roles: [],
				projects: [
					{
						id: 1,
						name: 'P-C',
						roles: [],
						studies: [
							{ id: 1, name: 'S-E', roles: [] },
							{ id: 2, name: 'S-F', roles: [] },
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
					{ id: 1, name: 'S-G', roles: ['admin'] }
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
					{ id: 1, name: 'S-H', roles: ['admin'] }
				]
			}]
		}]
	}
]
