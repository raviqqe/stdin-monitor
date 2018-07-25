Feature: Options
	Scenario: Use verbose option
		Given I run the following commands:
		"""
		for _ in $(seq 1000)
		do
			echo 123456789 >> foo.txt
		done
		"""
		When I run the following commands:
		"""
		cat foo.txt | node $script --verbose
		"""
		Then the exit status should be 0
		And the stdout should contain "VERBOSE"
