<?php

namespace App\Controller;

use App\Repository\ProductsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ApiProductsController extends AbstractController
{
    /**
     * @Route("/api/products", name="api_post_index", methods={"GET"})
     */
    public function index(ProductsRepository $productsRepository)
    {
        $post = $productsRepository->findAll();

        return $this->json($post, 200, [], ['groups' => 'product']);
    }
}
