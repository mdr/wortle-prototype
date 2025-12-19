{
  description = "Plant ID Game development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_22
            pnpm
            git
            pre-commit
            go-task
          ];

          shellHook = ''
            echo "Node: $(node --version)"
            echo "pnpm: $(pnpm --version)"
            echo "Git: $(git --version)"
          '';
        };
      });
}
