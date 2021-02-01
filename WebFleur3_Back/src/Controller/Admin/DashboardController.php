<?php

namespace App\Controller\Admin;

use App\Entity\Admin;
use App\Entity\Category;
use App\Entity\Products;
use App\Entity\Users;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractDashboardController
{
    /**
     * @Route("/admin", name="admin")
     */
    public function index(): Response
    {
        return parent::index();
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Web Fleurs 3');
    }

    public function configureMenuItems(): iterable
    {
//        yield MenuItem::linktoDashboard('Dashboard', 'fa fa-home');
        yield MenuItem::linkToCrud('Produits', 'fas fa-list', Products::class);
        yield MenuItem::linkToCrud('Utilisateurs', 'fas fa-user', Users::class);
        yield MenuItem::linkToCrud('Admin', 'far fa-user-circle', Admin::class);
        yield MenuItem::linkToCrud('Catégories', 'fas fa-tag', Category::class);
    }
}