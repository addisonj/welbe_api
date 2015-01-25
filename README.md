# welbe_api
An unofficial and incomplete API for welbe, primarily focused on letting you report stuff.

## CLI Usage
Add in ~/.welbe.json with:
```
{
  "email" : "myemail@email",
  "password" : "mysecretpassword"
}
```
or use env vars:
```
WELBE_EMAIL=myemail@email
WELBE_PASSWORD=mysecretpassword
```

then:

```
# add 24 ounces to you daily consumption
welbe trackWater --ounces 24
# track a meal you ate
welbe trackMeal --grains 2 --proteins 2
```

To see all the options `welbe help`.

## API Docs
See [docs.md](docs.md) for docs


