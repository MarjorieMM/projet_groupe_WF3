<?php

namespace App\Entity;

use App\Repository\UsersRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=UsersRepository::class)
 */
class Users implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("users")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     * @Groups("users")
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=100)
     *  @Groups("users")
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=100)
     *  @Groups("users")
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     *  @Groups("users")
     */
    private $address;

    /**
     * @ORM\Column(type="string")
     *  @Groups("users")
     */
    private $cp;

    /**
     * @ORM\Column(type="string", length=100)
     *  @Groups("users")
     */
    private $town;

    // public function __construct()
    // {
    //     $this->userRoles = new ArrayCollection();
    // }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getCp(): ?string
    {
        return $this->cp;
    }

    public function setCp(string $cp): self
    {
        $this->cp = $cp;

        return $this;
    }

    public function getTown(): ?string
    {
        return $this->town;
    }

    public function setTown(string $town): self
    {
        $this->town = $town;

        return $this;
    }

    public function eraseCredentials()
    {
    }

    public function getSalt()
    {
    }

    // public function getPassword()
    // {
    // }
    public function getUsername()
    {
    }

    public function getRoles()
    {
        return ['ROLE_USER'];
    }
}