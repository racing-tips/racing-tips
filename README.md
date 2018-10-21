# Racing Tips

This project aims to answer the age old question - how successful are the racing tips on [Radio 4's Today programme](https://www.bbc.co.uk/programmes/b006qj9z)?

There may be sources out there that give you this data for free however this wouldn't serve the second more important aim. That of using techniques, tools and technologies I either have an interest in or feel that I want to further develop.

Examples being:
  * Docker
  * Kubernetes
  * Helm
  * Java / Kotlin
  * Gradle
  * Microservice architecture
  * Event driven architecure
  * Domain Driven Design
  * ML
  * API design
  * Automated testing
  * Deployment Pipelines
  * IaC

I want to get the answer and display on a website. To do this can have something very small and manual for v1 and iterate to a more complex software stack utilising / learning more tools as I go. (Of course depending on amount of time I have to code on my spare time)

Version 1

* Manually add tips to DB
* Manually add results to DB
* Single Microservice to retrieve tips and results
* API Gateway
* Web site to display the days result
* Unauthenticated

Version 2...N

* Automatically add results (https://developer.betfair.com)
* Automatically add tips (data source Twitter)
* Historical / graphical view
* Authenticated
* Capture who made the tip
* Capture what odds
* Ingest live radio stream, convert speech to text then to meaningful data (NLP/ML?)
* Other tipsters
* ....

## Developing

### Repository Structure

```
.
├── README.md
├── backend
├── docs
└── infrastructure
```

