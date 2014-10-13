<?php

function generateProducts ($files)
{
    foreach ($files as $file)
    {
        $handle = fopen ($file, "r");
        while ($row = fgetcsv ($handle))
        {
            $product = array_slice ($row, 0, 5);
            if (empty ($product [1]))
            {
                continue;
            }

            $id = array_pop ($product);
            array_unshift ($product, $id);
            $product [2] = (int) $product [2];
            $product [3] = (int) $product [3];
            $product [4] = (int) $product [4];

            yield ($product);
        }
        fclose ($handle);
    }
}

$files = $_SERVER['argv'];
array_shift ($files);

$products = iterator_to_array (generateProducts ($files));
echo json_encode ($products);
