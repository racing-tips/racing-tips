# Racing Tips

[![CircleCI](https://circleci.com/gh/racing-tips/racing-tips.svg?style=svg)](https://circleci.com/gh/racing-tips/racing-tips)

This project aims to answer the age old question - how successful are the racing tips on [Radio 4's Today programme](https://www.bbc.co.uk/programmes/b006qj9z)?

There may be sources out there that give you this data for free however this wouldn't serve the second more important aim. That of using techniques, tools and technologies I either have an interest in or feel that I want to further develop.

Examples being:
  * Docker
  * Kubernetes
  * Helm
  * Java / Kotlin
  * Gradle
  * Microservice architecture
    * Logging
    * Monitoring
    * Resilience
    * Testing
  * Event driven architecure
  * Domain Driven Design
  * ML
  * API design
  * Automated testing
  * Deployment Pipelines
  * IaC

I want to get the answer and display on a website. To do this can have something very small and manual for v1 and iterate to a more complex software stack utilising / learning more tools as I go. (Of course depending on amount of time I have to code in my spare time)

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
├── docker
├── docs
└── infrastructure
```

# Build and Deployment

Checkout Circle CI `.circleci/config.yml` in the root of the repo. Pipeline is split out into a number of steps:

## build_docker job

1. Set custom build image with necessary tooling installed, Helm, Kops etc.
2. Set dedicated `circleci` user AWS secret and secret id environment variables
3. Build + test backend services using standard Java Gradle plugin
4. [Jib gradle plugin](https://github.com/GoogleContainerTools/jib/tree/master/jib-gradle-plugin) step to create images. Distroless Java base image by default.
5. Saves images to ECR registry. Authenticate via [ECR Credential helper](https://github.com/awslabs/amazon-ecr-credential-helper.git)
6. Create helm package from `infrastructure/chart-src` folder referencing new image tag
7. Save to S3 helm repository

## deploy job

Pattern heavily inspired by [weave.works GitOps](https://www.weave.works/blog/delivering-quality-at-speed-with-gitops) and [Jenkins X promotion](https://jenkins-x.io/about/features/#promotion)

1. Deployment manifest in the form of a Helm meta chart stored in an environment specific git repository
2. On successful build promote manifest - create a PR to staging env repo containing updated versions of Helm packages
3. If PR passes policies for that particular repo merge to master. Staging policies allow automated merge, Production environment PRs can have a manual approval if desired
4. Deploy triggered on update of master