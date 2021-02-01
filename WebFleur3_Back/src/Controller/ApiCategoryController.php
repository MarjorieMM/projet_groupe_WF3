<?php

namespace App\Controller;

use App\Repository\CategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ApiCategoryController extends AbstractController
{
    /**
     * @Route("/api/category", name="api_category", methods={"GET"})
     */
    public function index(CategoryRepository $categoryRepository): Response
    {
        $get = $categoryRepository->findAll();

        return $this->json($get, 200, [], ['groups' => 'category']);
    }
}
