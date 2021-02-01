<?php

namespace App\Controller;

use App\Repository\AdminRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends AbstractController
{
    /**
     * @Route("/api/admin", name="api_admin", methods={"GET"})
     */
    public function index(AdminRepository $adminRepository)
    {
        $post = $adminRepository->findAll();

        return $this->json($post, 200, [], ['groups' => 'admin']);
    }
}