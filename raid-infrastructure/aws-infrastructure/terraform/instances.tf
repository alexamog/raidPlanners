resource "aws_instance" "ubuntu" {
  instance_type = "t2.micro"
  ami           = data.aws_ami.ubuntu.id
  for_each      = toset(["aws"])

  tags = {
    Name   = "ubuntu-${each.value}"
    Server = "${each.key}-server"
  }

  key_name               = aws_key_pair.local_key.id
  vpc_security_group_ids = [aws_security_group.main.id]
  subnet_id              = aws_subnet.main.id

  root_block_device {
    volume_size = 10
  }
}
