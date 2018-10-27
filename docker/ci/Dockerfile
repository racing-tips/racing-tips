FROM golang:1.9 as ecr-login

RUN git clone https://github.com/awslabs/amazon-ecr-credential-helper.git /go/src/github.com/awslabs/amazon-ecr-credential-helper
WORKDIR /go/src/github.com/awslabs/amazon-ecr-credential-helper
RUN make

FROM circleci/openjdk:8-jdk

COPY --from=ecr-login /go/src/github.com/awslabs/amazon-ecr-credential-helper/bin/local/ /usr/local/bin
