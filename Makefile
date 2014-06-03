REPORTER=spec
TESTS=$(shell find ./test -type f -name "test.js")


test:
	@NODE_ENV=test mocha \
		--reporter $(REPORTER) \
		--timeout 15000 \
		--ui tdd \
		$(TESTS)

.PHONY: test