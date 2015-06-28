<?php

function generateProducts ($files)
{
    foreach ($files as $file)
    {
        $handle = fopen ($file, "r");
        $group = '';
        while ($row = fgetcsv ($handle))
        {
            if (count ($row) < 6)
            {
                $row [] = '';
            }
            list ($title, $cal, $weight, $soldByPiece, $id, $keywords) = $row;

            if ('group' == $title)
            {
                $group = $cal;
                continue;
            }

            if (empty ($cal) && empty ($weight))
            {
                continue;
            }

            $cal = (int) $cal;
            $weight = (int) $weight;
            $soldByPiece = (int) $soldByPiece;

            yield ([$id, $title, $group, $cal, $weight, $soldByPiece, $keywords]);
        }
        fclose ($handle);
    }
}

$files = $_SERVER['argv'];
array_shift ($files);

$products = iterator_to_array (generateProducts ($files));
echo json_encode ($products);
