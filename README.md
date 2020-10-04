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
