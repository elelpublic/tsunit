#!/bin/bash

tsc *.ts
tsc tests/*.ts
node tests/tests.js