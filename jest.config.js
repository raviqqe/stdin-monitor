module.exports = {
	collectCoverage: true,
	moduleFileExtensions: ['js'],
	transform: {
		"^.+\\.js$": "babel-jest"
	},
	testMatch: ['<rootDir>/src/**/__tests__/*.js']
};
