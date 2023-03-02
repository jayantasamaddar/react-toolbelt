const ci_check = () => {
  if (!process.env.CI !== undefined) return 'false';
  else 'true';
};

process.stdout.write(ci_check());
