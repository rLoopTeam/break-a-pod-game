var environments = [
	{ // savannah
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
					'y':50
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
			'trees' : {
				'type': 'repeat_unique_randomized',
				'textures' : ['savannah_tree1', 'savannah_tree2', 'savannah_tree3'],
				'anchors' : [{'x':0.5,'y':1}, {'x':0.5,'y':1}, {'x':0.5,'y':1}],
				'parallax': 0.4,
				'fixedToCamera': false,
				'scale' : {
					'x':1,
					'y':1
				},
				'position' : {
					'x':0,
					'y':560
				},
				'position_offset' : {
					'x':700,
					'y':0
				},
				'position_random_factor': {
					'x':1,
					'y':0
				},
				'velocity' : {
					'x':0,
					'y':0
				}
			},
			
			'grass' : {
				'type': 'repeat',
				'texture' : 'savannah_grass',
				'parallax': 1,
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
	{ // Grassy Hills Night
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
	},
	{ // Forest Night
	    'name': 'Forest Night',
	    'background': {
	        'skyObj': {
	            'type': 'unique', // types :- unqique, repeat
	            'texture': 'forest_night_sky',
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
	            'texture': 'forest_night_moon',
	            'parallax': 1,
	            'fixedToCamera': true,
	            'scale': {
	                'x': 1,
	                'y': 1
	            },
	            'position': {
	                'x': 550,
	                'y': 35
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
	    	'clouds' : {
				'type': 'repeat',
				'texture' : 'forest_night_clouds',
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
					'y':35
				},
				'tilePosition': {
	                'x': 0,
	                'y': 0
	            },
				'velocity' : {
					'x':-0.5,
					'y':0
				}
			},
	    	'trees1': {
	            'type': 'repeat',
	            'texture': 'forest_night_trees1',
	            'parallax': 0.1,
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
	                'y': 135
	            },
	            'tilePosition': {
	                'x': 0,
	                'y': 0
	            },
	            'velocity': {
	                'x': 0,
	                'y': 0
	            }
	        },
	        'trees2': {
	            'type': 'repeat',
	            'texture': 'forest_night_trees2',
	            'parallax': 0.3,
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
	                'y': 195
	            },
	            'tilePosition': {
	                'x': 0,
	                'y': 0
	            },
	            'velocity': {
	                'x': 0,
	                'y': 0
	            }
	        },
	        'randomtrees' : {
				'type': 'repeat_unique_randomized',
				'textures' : ['forest_night_tree1', 'forest_night_tree2', 'forest_night_tree3'],
				'anchors' : [{'x':0.5,'y':1}, {'x':0.5,'y':1}, {'x':0.5,'y':1}],
				'parallax': 1,
				'fixedToCamera': false,
				'scale' : {
					'x':1,
					'y':1
				},
				'position' : {
					'x':0,
					'y':560
				},
				'position_offset' : {
					'x':700,
					'y':0
				},
				'position_random_factor': {
					'x':1,
					'y':0
				},
				'velocity' : {
					'x':0,
					'y':0
				}
			},
	        'grass': {
	            'type': 'repeat',
	            'texture': 'forest_night_grass',
	            'parallax': 1,
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
	},
	{ // Ocean
	    'name': 'Ocean',
	    'background': {
	        'skyObj': {
	            'type': 'unique', // types :- unqique, repeat
	            'texture': 'ocean_sky',
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
	            'texture': 'ocean_sun',
	            'parallax': 1,
	            'fixedToCamera': true,
	            'scale': {
	                'x': 1,
	                'y': 1
	            },
	            'position': {
	                'x': 345,
	                'y': 50
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
	    	'clouds2' : {
				'type': 'repeat',
				'texture' : 'ocean_clouds2',
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
					'y':110
				},
				'tilePosition': {
	                'x': 0,
	                'y': 0
	            },
				'velocity' : {
					'x':-0.1,
					'y':0
				}
			},
			'clouds1' : {
				'type': 'repeat',
				'texture' : 'ocean_clouds1',
				'parallax': 0.1,
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
					'y':110
				},
				'tilePosition': {
	                'x': -50,
	                'y': 0
	            },
				'velocity' : {
					'x':-0.2,
					'y':0
				}
			},
			'mountains2' : {
				'type': 'repeat',
				'texture' : 'ocean_mountains2',
				'parallax': 0.01,
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
					'y':510
				},
				'tilePosition': {
	                'x': 0,
	                'y': 0
	            },
				'velocity' : {
					'x':0,
					'y':0
				}
			},
			'mountains1' : {
				'type': 'repeat',
				'texture' : 'ocean_mountains1',
				'parallax': 0.03,
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
					'y':513
				},
				'tilePosition': {
	                'x': 0,
	                'y': 0
	            },
				'velocity' : {
					'x':0,
					'y':0
				}
			},
	        'water': {
	            'type': 'repeat',
	            'texture': 'ocean_water',
	            'parallax': 1,
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
	        },
	        'fish_right': {
	            'type': 'repeat',
	            'texture': 'fish_right',
	            'parallax': 1,
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
	                'y': 550
	            },
	            'tilePosition': {
	                'x': 0,
	                'y': 0
	            },
	            'velocity': {
	                'x': 0.5,
	                'y': 0
	            }
	        },
	        'fish_left': {
	            'type': 'repeat',
	            'texture': 'fish_left',
	            'parallax': 1,
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
	                'y': 565
	            },
	            'tilePosition': {
	                'x': 0,
	                'y': 0
	            },
	            'velocity': {
	                'x': -0.5,
	                'y': 0
	            }
	        }
	    }
	},
	{ // Mountains
	    'name': 'Mountains',
	    'background': {
	        'skyObj': {
	            'type': 'unique', // types :- unqique, repeat
	            'texture': 'mountain_sky',
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
	        }
	    },
	    'midground': {
	    	'clouds' : {
				'type': 'repeat',
				'texture' : 'mountain_clouds',
				'parallax': 0.01,
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
					'y':200
				},
				'tilePosition': {
	                'x': 0,
	                'y': 0
	            },
				'velocity' : {
					'x':-0.2,
					'y':0
				}
			},
			'mountains' : {
				'type': 'repeat',
				'texture' : 'mountain_mountains',
				'parallax': 0.01,
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
					'y':390
				},
				'tilePosition': {
	                'x': 0,
	                'y': 0
	            },
				'velocity' : {
					'x':0,
					'y':0
				}
			},
			'hills_far' : {
				'type': 'repeat',
				'texture' : 'mountain_hills2',
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
					'y':530
				},
				'tilePosition': {
	                'x': 0,
	                'y': 0
	            },
				'velocity' : {
					'x':0,
					'y':0
				}
			},
			'hills' : {
				'type': 'repeat',
				'texture' : 'mountain_hills',
				'parallax': 0.1,
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
					'y':490
				},
				'tilePosition': {
	                'x': 0,
	                'y': 0
	            },
				'velocity' : {
					'x':0,
					'y':0
				}
			},
	        'dirt': {
	            'type': 'repeat',
	            'texture': 'mountain_dirt',
	            'parallax': 1,
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
	                'y': 570
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
	},
	{ // skyline - night
	    'name': 'Skyline',
	    'background': {
	        'skyObj': {
	            'type': 'unique_randomized', // types :- unqique, repeat
	            'textures': ['skyline_dawn', 'skyline_dusk'],
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
	        }
	    },
	    'midground': {
	    	'skylinefar' : {
				'type': 'repeat',
				'texture' : 'skyline_far',
				'parallax': 0.01,
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
					'y':380
				},
				'tilePosition': {
	                'x': 0,
	                'y': 0
	            },
				'velocity' : {
					'x':0,
					'y':0
				}
			},
			'skylinemid' : {
				'type': 'repeat',
				'texture' : 'skyline_mid',
				'parallax': 0.02,
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
					'y':360
				},
				'tilePosition': {
	                'x': 0,
	                'y': 0
	            },
				'velocity' : {
					'x':0,
					'y':0
				}
			},
			'skylineclsoe' : {
				'type': 'repeat',
				'texture' : 'skyline_close',
				'parallax': 0.02,
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
					'y':320
				},
				'tilePosition': {
	                'x': 0,
	                'y': 0
	            },
				'velocity' : {
					'x':0,
					'y':0
				}
			},
			'hills_far' : {
				'type': 'repeat',
				'texture' : 'skyline_hills_far',
				'parallax': 0.02,
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
					'y':390
				},
				'tilePosition': {
	                'x': 0,
	                'y': 0
	            },
				'velocity' : {
					'x':0,
					'y':0
				}
			},
			'hills_mid' : {
				'type': 'repeat',
				'texture' : 'skyline_hills_mid',
				'parallax': 0.02,
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
					'y':450
				},
				'tilePosition': {
	                'x': 0,
	                'y': 0
	            },
				'velocity' : {
					'x':0,
					'y':0
				}
			},
			'hills' : {
				'type': 'repeat',
				'texture' : 'skyline_hills',
				'parallax': 0.02,
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
					'y':510
				},
				'tilePosition': {
	                'x': 0,
	                'y': 0
	            },
				'velocity' : {
					'x':0,
					'y':0
				}
			},
	        'ground': {
	            'type': 'repeat',
	            'texture': 'skyline_ground',
	            'parallax': 1,
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
	                'y': 570
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