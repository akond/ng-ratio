<?php

function generateProducts ($file)
{
  while ($row = fgetcsv ($file))
  {
    $product = array_slice ($row, 0, 5);
    $id = array_pop ($product);
    array_unshift ($product, $id);

    yield ($product);
  }
}

chdir ("..");
$file = fopen ("etc/product-list.csv", "r");
$products = array_filter (iterator_to_array (generateProducts ($file)), function ($item)
{
  return false == empty ($item [1]);
});

echo json_encode ($products);
