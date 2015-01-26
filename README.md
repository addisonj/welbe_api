# welbe_api
An unofficial and incomplete API for welbe, primarily focused on letting you report stuff.

## CLI Usage
Create a `~/.welbe.json` file containing:
```
{
  "email" : "myemail@email",
  "password" : "mysecretpassword"
}
```
or use environment variables:
```
WELBE_EMAIL="myemail@email"
WELBE_PASSWORD="mysecretpassword"
```

then:

```
# add 24 ounces to your daily consumption
welbe trackWater --ounces 24
# track a meal you ate
welbe trackMeal --grains 2 --proteins 2
```

To see all the options `welbe help`.

## API Docs
See [docs.md](docs.md) for docs


