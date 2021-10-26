# Ebisu Github Action

This action use for sending alert with ebisu when action failed

## Inputs

## `service-name`

**Required** Service name you used.

## `message`

**Required** Message that you want to send.

## `address`
**Required** Ebisu address

## Outputs

## `id`

Message id get by ebisu.

## Example usage

```yaml
uses: guaychou/ebisu-action@main
with:
  service-name: 'Service name'
  message: "Deployment on going bro"
  address: "http://ebisu-address.com:8080"
```