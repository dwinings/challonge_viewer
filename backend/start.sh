#!/bin/bash

RACK_ENV=production bundle exec puma -w 2 config.ru 1> production.log 2>&1
