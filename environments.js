var environments = [
	{
		'name' : 'Grassy',
		'background': {
			'skyObj' : {
				'type': 'unique', // types :- unqique, repeat
				'texture' : 'sunny_sky',
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
				'texture' : 'sun',
				'parallax': 1,
				'fixedToCamera': true,
				'scale' : {
					'x':1,
					'y':1
				},
				'position' : {
					'x':500,
					'y':50
				},
				'velocity' : {
					'x':0,
					'y':0
				}
			}
		},
		'midground': {
			'mountainsbig' : {
				'type': 'repeat',
				'texture' : 'mountain',
				'parallax': 0.1,
				'fixedToCamera': false,
				'scale' : {
					'x':1.3,
					'y':1.5
				},
				'position' : {
					'x':-200,
					'y':800
				},
				'velocity' : {
					'x':0,
					'y':0
				}
			},
			'mountainswide' : {
				'type': 'repeat',
				'texture' : 'mountain',
				'parallax': 0.1,
				'fixedToCamera': false,
				'scale' : {
					'x':2,
					'y':1
				},
				'position' : {
					'x':0,
					'y':900
				},
				'velocity' : {
					'x':0,
					'y':0
				}
			},
			'hills' : {
				'type': 'repeat',
				'texture' : 'grassy_hill',
				'parallax': 0.3,
				'fixedToCamera': false,
				'scale' : {
					'x':1.5,
					'y':1
				},
				'position' : {
					'x':300,
					'y':500
				},
				'velocity' : {
					'x':0,
					'y':0
				}
			},
			'hills2' : {
				'type': 'repeat',
				'texture' : 'grassy_hill',
				'parallax': 0.4,
				'fixedToCamera': false,
				'scale' : {
					'x':1.5,
					'y':1
				},
				'position' : {
					'x':0,
					'y':650
				},
				'velocity' : {
					'x':0,
					'y':0
				}
			}					
		},
		'foreground': {
			'hills' : {
				'type': 'repeat',
				'texture' : 'grassy_hill',
				'parallax': 0,
				'fixedToCamera': false,
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