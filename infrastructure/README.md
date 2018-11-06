# Cluster set up

Use [Kops](https://github.com/kubernetes/kops/blob/master/docs/aws.md)

Below are commands slightly tailored for racing-tips:

First create storage account

```
$ aws s3api create-bucket \
    --bucket racing-tips-cluster \
    --region us-east-1

$ aws s3api put-bucket-versioning --bucket racing-tips-cluster  --versioning-configuration Status=Enabled

$ aws s3api put-bucket-encryption --bucket racing-tips-cluster --server-side-encryption-configuration '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'

```

Prepare local env

```
$ export NAME=racing-tips.k8s.local
$ export KOPS_STATE_STORE=s3://racing-tips-cluster
```

Create cluster config and update to actually build out infra in aws

```
$ aws ec2 describe-availability-zones --region eu-west-1

{
    "AvailabilityZones": [
        {
            "State": "available",
            "Messages": [],
            "RegionName": "eu-west-1",
            "ZoneName": "eu-west-1a"
        },
        {
            "State": "available",
            "Messages": [],
            "RegionName": "eu-west-1",
            "ZoneName": "eu-west-1b"
        },
        {
            "State": "available",
            "Messages": [],
            "RegionName": "eu-west-1",
            "ZoneName": "eu-west-1c"
        }
    ]
}

$ kops create cluster \
    --zones eu-west-1a \
    ${NAME}

$ kops update cluster ${NAME} --yes
$ kops validate cluster

```

Remember to delete after experimenting
```
$ kops delete cluster --name ${NAME}
$ kops delete cluster --name ${NAME}  --yes
```

Note need to determine if we want a [private](https://github.com/kubernetes/kops/blob/master/docs/topology.md) cluster network topology

