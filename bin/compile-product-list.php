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
            list ($title, $cal, $weight, $flag, $id, $keywords) = $row;

            if ('group' == $title)
            {
                $group = $cal;
                continue;
            }

            if (empty ($cal))
            {
                continue;
            }

            $cal = (int) $cal;
            $weight = (int) $weight;
            $flag = (int) $flag;

            // if (false == empty ($group))
            // {
            //     if ($keywords)
            //     {
            //         $keywords .= ' ';
            //     }
            //     $keywords .= $group;
            // }

            yield ([$id, $title, $group, $cal, $weight, $keywords]);
        }
        fclose ($handle);
    }
}

$files = $_SERVER['argv'];
array_shift ($files);

$products = iterator_to_array (generateProducts ($files));
echo json_encode ($products);
