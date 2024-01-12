output "public_ip" {
  description = "Contains the public IP addresses"

  value = {
    for instance_name, instance_eip in aws_eip.eip :
      instance_name => instance_eip.public_ip
  }
}
