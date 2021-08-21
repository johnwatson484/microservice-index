
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=johnwatson484_microservice-index&metric=alert_status)](https://sonarcloud.io/dashboard?id=johnwatson484_microservice-index)
[![Known Vulnerabilities](https://snyk.io/test/github/johnwatson484/microservice-index/badge.svg)](https://snyk.io/test/github/johnwatson484/microservice-index)

# Microservice Index
Catalogue microservices within an organisation.

Uses [GOV.UK Design System](https://design-system.service.gov.uk/)

## Prerequisites
- Docker
- Docker Compose

## Running application
### Docker
```
docker-compose build
docker-compose up
```

## Publishing service updates
Services can be published via Http `POST` to `/`.  

### Payload
```
name: string,
repository: string,
version: string,
description: string,
framework: string,
owner: string
```
