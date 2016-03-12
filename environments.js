var environments = [
	{
		'name' : 'Savannah',
		'background': {
			'skyObj' : {
				'type': 'unique', // types :- unqique, repeat
				'texture' : 'savannah_sky',
				'parallax': 1,
				'fixedToCamera': true,
				'scale' : {
					'x':1,
					'y':1
				},
				'position' : {
					'x':0,
					'y':0
				},
				'velocity' : {
					'x':0,
					'y':0
				}
			},
			'skyLightObj' : {
				'type': 'unique',
				'texture' : 'savannah_sun',
				'parallax': 1,
				'fixedToCamera': true,
				'scale' : {
					'x':1,
					'y':1
				},
				'position' : {
					'x':650,
					'y':0
				},
				'velocity' : {
					'x':0,
					'y':0
				}
			}
		},
		'midground': {
			'clouds' : {
				'type': 'repeat',
				'texture' : 'savannah_clouds',
				'parallax': 0.05,
				'fixedToCamera': false,
				'scale' : {
					'x':1,
					'y':1
				},
				'tileScale': {
	                'x': 1,
	                'y': 1
	            },
				'position' : {
					'x':0,
					'y':0
				},
				'tilePosition': {
	                'x': 0,
	                'y': 0
	            },
				'velocity' : {
					'x':-1,
					'y':0
				}
			},
			
			'grass' : {
				'type': 'repeat',
				'texture' : 'savannah_grass',
				'parallax': 0.4,
				'fixedToCamera': false,
				'scale' : {
					'x':1,
					'y':1
				},
	            'tileScale': {
	                'x': 1,
	                'y': 1
	            },
				'position' : {
					'x':0,
					'y':550
				},
				'tilePosition': {
	                'x': 0,
	                'y': 0
	            },
				'velocity' : {
					'x':0,
					'y':0
				}
			}					
		}
	},
	{
	    'name': 'Grassy Hills Night',
	    'background': {
	        'skyObj': {
	            'type': 'unique', // types :- unqique, repeat
	            'texture': 'night_sky',
	            'parallax': 1,
	            'fixedToCamera': true,
	            'scale': {
	                'x': 1,
	                'y': 1
	            },
	            'position': {
	                'x': 0,
	                'y': 0
	            },
	            'velocity': {
	                'x': 0,
	                'y': 0
	            }
	        },
	        'skyLightObj': {
	            'type': 'unique',
	            'texture': 'moon',
	            'parallax': 1,
	            'fixedToCamera': true,
	            'scale': {
	                'x': 1,
	                'y': 1
	            },
	            'position': {
	                'x': 500,
	                'y': 100
	            },
	            'tilePosition': {
	                'x': 0,
	                'y': 0
	            },
	            'velocity': {
	                'x': 0,
	                'y': 0
	            }
	        }
	    },
	    'midground': {
	        'hills': {
	            'type': 'repeat',
	            'texture': 'night_grass',
	            'parallax': 0.5,
	            'fixedToCamera': false,
	            'scale': {
	                'x': 1,
	                'y': 1
	            },
	            'tileScale': {
	                'x': 1,
	                'y': 1
	            },
	            'position': {
	                'x': 0,
	                'y': 552
	            },
	            'tilePosition': {
	                'x': 0,
	                'y': 0
	            },
	            'velocity': {
	                'x': 0,
	                'y': 0
	            }
	        }
	    }
	}
];