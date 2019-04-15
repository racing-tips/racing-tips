FROM golang:1.9 as ecr-login

RUN git clone https://github.com/awslabs/amazon-ecr-credential-helper.git /go/src/github.com/awslabs/amazon-ecr-credential-helper
WORKDIR /go/src/github.com/awslabs/amazon-ecr-credential-helper
RUN make

FROM circleci/openjdk:8-jdk

COPY --from=ecr-login /go/src/github.com/awslabs/amazon-ecr-credential-helper/bin/local/ /usr/local/bin

# kubectl
RUN sudo apt-get update && sudo apt-get install -y apt-transport-https
RUN curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
RUN echo "deb http://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
RUN sudo apt-get update
RUN sudo apt-get install -y kubectl

# kops
RUN sudo curl -LO https://github.com/kubernetes/kops/releases/download/$(curl -s https://api.github.com/repos/kubernetes/kops/releases/latest | grep tag_name | cut -d '"' -f 4)/kops-linux-amd64
RUN sudo chmod +x kops-linux-amd64
RUN sudo mv kops-linux-amd64 /usr/local/bin/kops

# helm
ADD get_helm.sh get_helm.sh
RUN sudo chmod +x get_helm.sh
RUN ./get_helm.sh
RUN helm init --client-only
RUN helm plugin install https://github.com/hypnoglow/helm-s3.git

# node
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN sudo apt-get install -y nodejs

# Custom tooling
WORKDIR /home/circleci/tooling
COPY ./tooling ./
RUN sudo chown -R $(whoami):$(whoami) ./
RUN npm install
RUN sudo ln -s ./update-requirements.js /usr/local/bin