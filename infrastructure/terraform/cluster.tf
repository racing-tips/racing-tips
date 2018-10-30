variable "cluster-name" {
  default = "racing-tips-cluster"
  type    = "string"
}
data "aws_availability_zones" "available" {}

resource "aws_vpc" "racing-tips" {
  cidr_block = "10.0.0.0/16"

  tags = "${
    map(
     "Name", "racing-tips-node",
     "kubernetes.io/cluster/${var.cluster-name}", "shared",
    )
  }"
}

resource "aws_subnet" "racing-tips" {
  count = 2

  availability_zone = "${data.aws_availability_zones.available.names[count.index]}"
  cidr_block        = "10.0.${count.index}.0/24"
  vpc_id            = "${aws_vpc.racing-tips.id}"

  tags = "${
    map(
     "Name", "racing-tips-node",
     "kubernetes.io/cluster/${var.cluster-name}", "shared",
    )
  }"
}

resource "aws_internet_gateway" "racing-tips" {
  vpc_id = "${aws_vpc.racing-tips.id}"

  tags {
    Name = "racing-tips"
  }
}

resource "aws_route_table" "racing-tips" {
  vpc_id = "${aws_vpc.racing-tips.id}"

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.racing-tips.id}"
  }
}

resource "aws_route_table_association" "racing-tips" {
  count = 2

  subnet_id      = "${aws_subnet.racing-tips.*.id[count.index]}"
  route_table_id = "${aws_route_table.racing-tips.id}"
}
