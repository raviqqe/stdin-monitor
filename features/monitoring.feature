Feature: Monitoring
	Scenario Outline: Output monitored information
		Given I run the following commands:
		"""
		for _ in $(seq <lines>)
		do
			echo 123456789 >> foo.txt
		done
		"""
		When I run the following commands:
		"""
		cat foo.txt | node $script > bar.txt
		"""
		Then the exit status should be 0
		And I run the following commands:
		"""
		lines=$(cat bar.txt | wc -l)

		[ $lines -gt 0 ]
		[ $lines -eq $(grep 'Throughput rate: [0-9]\+ bytes / sec' bar.txt | wc -l) ]
		[ $lines -eq $(grep 'Total lines: [0-9]\+' bar.txt | wc -l) ]
		"""
		Then the exit status should be 0
		Examples:
			| lines    |
			| 1000     |
			| 10000000 |
